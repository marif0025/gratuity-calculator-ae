import * as React from "react";
import { cn } from "@/lib/utils";
import { TableCell, TableRow, TableData } from "@/sanity/lib/types";

interface TableProps {
    data: TableData;
    title?: string;
    caption?: string;
    className?: string;
}

// Helper function to extract text from cell (handles both string and TableCell)
const getCellText = (cell: TableCell | string): string => {
    if (typeof cell === "string") {
        return cell;
    }
    return cell.text || "";
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ data, title, caption, className, ...props }, ref) => {
        // Default styling values
        const striped = true;
        const bordered = true;
        const compact = false;

        if (!data?.rows || data.rows.length === 0) {
            return (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No table data available</p>
                </div>
            );
        }

        const head = data.rows[0]?.cells;
        const body = data.rows.slice(1);

        const tableElement = (
            <table
                ref={ref}
                className={cn(
                    "w-full border-collapse",
                    bordered && "border border-border",
                    compact ? "text-sm" : "text-base",
                    className
                )}
                {...props}
            >
                {caption && (
                    <caption className="text-sm text-muted-foreground text-center py-2">
                        {caption}
                    </caption>
                )}

                {head && (
                    <thead>
                        <tr
                            className={cn(
                                "bg-muted/50",
                                bordered && "border-b border-border"
                            )}
                        >
                            {head.map((cell, index) => {
                                const cellText = getCellText(cell);

                                return (
                                    <th
                                        key={
                                            typeof cell === "string"
                                                ? index
                                                : cell._key || index
                                        }
                                        className={cn(
                                            "font-semibold text-left",
                                            compact ? "p-2!" : "p-3!",
                                            bordered &&
                                                "border-r border-border last:border-r-0"
                                        )}
                                    >
                                        {cellText}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                )}

                <tbody>
                    {body.map((row, rowIndex) => (
                        <tr
                            key={row._key || rowIndex}
                            className={cn(
                                striped && rowIndex % 2 === 0 && "bg-muted/30",
                                bordered &&
                                    "border-b border-border last:border-b-0"
                            )}
                        >
                            {row.cells?.map((cell, cellIndex) => {
                                const cellText = getCellText(cell);

                                return (
                                    <td
                                        key={
                                            typeof cell === "string"
                                                ? cellIndex
                                                : cell._key || cellIndex
                                        }
                                        className={cn(
                                            compact ? "p-2!" : "p-3!",
                                            bordered &&
                                                "border-r border-border last:border-r-0"
                                        )}
                                    >
                                        {cellText}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        );

        return (
            <div className="w-full overflow-x-auto">
                {title && (
                    <h3 className="text-lg font-semibold mb-3">{title}</h3>
                )}
                {tableElement}
            </div>
        );
    }
);

Table.displayName = "Table";

export { Table };
export type { TableProps };
