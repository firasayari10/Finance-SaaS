const dateFormat = "yyyy-MM-dd HH:mm:ss"; // Removed leading space
const outputFormat = "yyyy-MM-dd"; // Fixed typo

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { ImportTable } from "@/app/(dashboard)/transactions/ImportTable";
import { useState } from "react";
import { boolean } from "zod";
import { converAmountToMiliunits } from "@/lib/utils";
import { format, parse, isValid } from "date-fns" // Added isValid import

const requiredOptions = [
    "amount",
    "date",
    "payee",
];

interface SelectedColumnsState {
    [key: string]: string | null;
};

type Props = {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
}

export const ImportCard = ({
    data, onCancel, onSubmit
}: Props) => {
    const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({})
    const headers = data[0];
    const body = data.slice(1);

    const onTableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = { ...prev };
            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null;
                }
            }
            if (value === "skip") {
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;
            return newSelectedColumns;
        })
    }

    const progress = Object.values(selectedColumns).filter(Boolean).length;

    const handleContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split("_")[1];
        };

        const mappedData = {
            headers: headers.map((_header, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);
                return selectedColumns[`column_${columnIndex}`] || null;
            }),
            body: body.map((row) => {
                const transformedRow = row.map((cell, index) => {
                    const columnIndex = getColumnIndex(`column_${index}`);
                    return selectedColumns[`column_${columnIndex}`] ? cell : null;
                })
                return transformedRow.every((item) => item === null)
                    ? []
                    : transformedRow;
            }).filter((row) => row.length > 0),
        };

        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, index) => {
                const header = mappedData.headers[index];
                if (header !== null) {
                    acc[header] = cell;
                }
                return acc;
            }, {});
        });

        const formattedData = arrayOfData.map((item) => {
            try {
                // Parse amount safely
                let amount = 0;
                if (item.amount) {
                    const parsedAmount = parseFloat(item.amount);
                    if (!isNaN(parsedAmount)) {
                        amount = converAmountToMiliunits(parsedAmount);
                    }
                }

                // Parse date safely with multiple format attempts
                let formattedDate = format(new Date(), outputFormat); // Default to today
                if (item.date) {
                    try {
                        // Try the primary format first
                        let parsedDate = parse(item.date, dateFormat, new Date());
                        if (!isValid(parsedDate)) {
                            // Try without time
                            parsedDate = parse(item.date, "yyyy-MM-dd", new Date());
                        }
                        if (!isValid(parsedDate)) {
                            // Try other common formats
                            const formats = ["MM/dd/yyyy", "dd/MM/yyyy", "yyyy/MM/dd"];
                            for (const fmt of formats) {
                                parsedDate = parse(item.date, fmt, new Date());
                                if (isValid(parsedDate)) break;
                            }
                        }
                        if (!isValid(parsedDate)) {
                            // Last resort: native Date parsing
                            parsedDate = new Date(item.date);
                        }
                        
                        if (isValid(parsedDate)) {
                            formattedDate = format(parsedDate, outputFormat);
                        }
                    } catch (error) {
                        console.warn('Date parsing failed for:', item.date, error);
                    }
                }

                return {
                    ...item,
                    amount: amount,
                    date: formattedDate
                };
            } catch (error) {
                console.error('Error processing item:', item, error);
                return {
                    ...item,
                    amount: 0,
                    date: format(new Date(), outputFormat)
                };
            }
        });

        console.log('Formatted data:', formattedData);
        onSubmit(formattedData);
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 mb-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import transaction
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-2">
                        <Button size="sm" onClick={onCancel} className="w-full lg:w-auto">
                            Cancel
                        </Button>
                        <Button size="sm" disabled={progress < requiredOptions.length} onClick={handleContinue} className="w-full lg:w-auto">
                            Continue ({progress} / {requiredOptions.length})
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeadSelectChange={onTableHeadSelectChange}
                    />
                </CardContent>
            </Card>
        </div>
    )
}