"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface TableColumnDef<T> {
  key: string;
  header: string;
  cell?: (row: T) => ReactNode;
}

interface UseTableOptions<T> {
  rows: T[];
  columns: TableColumnDef<T>[];
  rowKey: (row: T) => string;
  renderActions?: (row: T) => ReactNode;
  pageSize?: number;
}

export function useTable<T>({
  rows,
  columns,
  rowKey,
  renderActions,
  pageSize,
}: UseTableOptions<T>) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!pageSize) return 1;
    return Math.max(1, Math.ceil(rows.length / pageSize));
  }, [rows.length, pageSize]);

  const paginatedRows = useMemo(() => {
    if (!pageSize) return rows;
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page, pageSize]);

  return {
    columns,
    rows: paginatedRows,
    rowKey,
    actions: renderActions,
    page,
    setPage,
    totalPages,
  };
}
