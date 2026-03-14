"use client";

import React from 'react';

interface FormattedQuestionTextProps {
    text: string;
    className?: string;
}

export default function FormattedQuestionText({ text, className = "" }: FormattedQuestionTextProps) {
    // Regex to detect markdown tables
    // Looking for a sequence of lines starting with | and ending with |
    const tableRegex = /((?:^\|.*\|(?:\r?\n|$)){2,})/gm;
    
    const parts = text.split(tableRegex);
    
    if (parts.length === 1) {
        return <p className={`whitespace-pre-wrap ${className}`}>{text}</p>;
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {parts.map((part, index) => {
                // Check if this part is a table
                if (part.trim().startsWith('|') && part.trim().endsWith('|') && part.includes('| ---')) {
                    // Parse the table
                    const lines = part.trim().split(/\r?\n/);
                    
                    const rows = lines
                        .filter(line => line.trim().startsWith('|') && !line.includes('| ---')) 
                        .map(line => {
                            // Split by | but ignore the first and last empty strings if they exist
                            const cells = line.split('|').map(c => c.trim());
                            if (cells[0] === '') cells.shift();
                            if (cells[cells.length - 1] === '') cells.pop();
                            return cells;
                        });
                    
                    const validRows = rows.filter(r => r.length > 0);
                    if (validRows.length === 0) return null;

                    const headers = validRows[0];
                    const dataRows = validRows.slice(1);

                    return (
                        <div key={index} className="overflow-hidden my-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
                            <table className="w-full text-left text-xs md:text-sm border-collapse">
                                <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                                    <tr>
                                        {headers.map((h, i) => (
                                            <th key={i} className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100 border-r last:border-r-0 border-zinc-200 dark:border-zinc-800">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {dataRows.map((row, i) => (
                                        <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                            {row.map((cell, j) => (
                                                <td key={j} className="px-4 py-3 text-zinc-700 dark:text-zinc-300 font-medium border-r last:border-r-0 border-zinc-100 dark:border-zinc-800">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                }
                
                const trimmedPart = part.trim();
                if (!trimmedPart) return null;
                
                return <p key={index} className="whitespace-pre-wrap">{trimmedPart}</p>;
            })}
        </div>
    );
}
