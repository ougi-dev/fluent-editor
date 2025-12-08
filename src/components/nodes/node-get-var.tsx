"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  NodeAction,
  NodeContainer,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@/components/ui/node";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getClientDb } from "@/db/client-db";
import { useUpdateNodeData } from "@/hooks/use-update-node-data";
import { cn } from "@/lib/utils";

type GetVarNode = Node<{ varName?: string; varValue?: unknown }, "get-var">;

type VarRecord = {
  name: string;
  description?: string;
  type?: string;
  value: unknown;
};

async function fetchGlobalVars(): Promise<VarRecord[]> {
  try {
    const db = await getClientDb();
    const res = await db.query("SELECT * FROM globalVar");
    // normalize result shapes: possible forms
    // - [{...}, {...}]
    // - [[{...}, {...}]]
    // - [{ result: [{...}, {...}] }]
    let arr: Record<string, unknown>[] = [];
    if (!Array.isArray(res)) {
      arr = [];
    } else if (Array.isArray(res[0])) {
      arr = res[0] as unknown as Record<string, unknown>[];
    } else if (typeof res[0] === "object" && res[0] !== null) {
      const firstObj = res[0] as Record<string, unknown>;
      if (Array.isArray(firstObj.result as unknown)) {
        arr = firstObj.result as Record<string, unknown>[];
      } else {
        arr = res as Record<string, unknown>[];
      }
    } else {
      arr = res as Record<string, unknown>[];
    }
    const mapped = arr
      .filter((r) => r && typeof r === "object")
      .map((r) => ({
        name: (r.name as string) ?? String(r.id ?? ""),
        description:
          (r.description as string) ?? (r.desc as string) ?? undefined,
        type: (r.type as string) ?? typeof r.value,
        value: r.value,
      }))
      .filter((r) => r.name) as VarRecord[];
    await db.close();
    if (mapped.length === 0) {
      console.debug(
        "fetchGlobalVars: no mapped variables found. raw response length:",
        Array.isArray(res) ? res.length : 0
      );
    }
    return mapped;
  } catch (err) {
    console.error(
      "Failed to fetch globalVar records (fetchGlobalVars):",
      err instanceof Error ? err.message : String(err)
    );
    return [];
  }
}

export default function GetVarNode({ data, id }: NodeProps<GetVarNode>) {
  const updateNode = useUpdateNodeData<GetVarNode>(id);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(data.varName ?? "");
  const [variables, setVariables] = React.useState<VarRecord[]>([]);
  const [loading, setLoading] = React.useState(false);
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    const fetchVars = async () => {
      setLoading(true);
      try {
        const mapped = await fetchGlobalVars();
        if (mountedRef.current) {
          setVariables(mapped);
        }
      } catch (err) {
        console.error(
          "Failed to fetch globalVar records:",
          err instanceof Error ? err.message : String(err)
        );
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
        // NOTE: Previously included inline normalization here; it's now handled inside fetchGlobalVars()
      }
    };

    fetchVars();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);

    // Find the selected variable and update the node state to include name and value
    const selected = variables.find((v) => v.name === currentValue);
    updateNode({ varName: currentValue, varValue: selected?.value });
  };

  const selectedLabel = value
    ? (variables.find((v) => v.name === value)?.description ?? value)
    : "Select variable...";

  return (
    <NodeContainer>
      <NodeHeader>
        <NodeTitle>Get Variable</NodeTitle>
        <NodeAction>Get</NodeAction>
        <NodeDescription>
          Return a persistent global variable value
        </NodeDescription>
      </NodeHeader>
      <NodeContent>
        <Label htmlFor={`getvar-${id}`}>Variable</Label>

        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild>
            <Button
              aria-expanded={open}
              className="justify-between"
              id={`getvar-${id}`}
              role="combobox"
              variant="outline"
            >
              {selectedLabel}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput className="h-9" placeholder="Search variables..." />
              <CommandList>
                <CommandEmpty>
                  {loading ? "Loading..." : "No variable found."}
                </CommandEmpty>
                <CommandGroup>
                  {variables.map((v) => (
                    <CommandItem
                      key={`gv-${v.name}`}
                      onSelect={(current) => handleSelect(current)}
                      value={v.name}
                    >
                      {v.description ?? v.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === v.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="mt-2 text-muted-foreground text-xs">
          Value:{" "}
          <span className="font-medium">{String(data.varValue ?? "—")}</span>
        </div>
      </NodeContent>
      <NodeFooter />

      {/* Connection handles */}
      <Handle position={Position.Left} type="target" />
      <Handle position={Position.Right} type="source" />
    </NodeContainer>
  );
}
