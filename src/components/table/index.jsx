import React, { useState, useMemo, useCallback } from "react";
import styles from "../../styles/table.module.scss";
import tableData from "../../data/tableData.json";
import TableRow from "./TableRow";
import NumericInput from "./NumericInput.jsx";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function getRowValue(row) {
  if (row.children && row.children.length > 0) {
    return row.children.reduce((sum, child) => sum + getRowValue(child), 0);
  }
  return row.modifiedValue !== undefined ? row.modifiedValue : row.value;
}

function flattenRows(rows) {
  let flatRows = [];
  rows.forEach((row) => {
    flatRows.push(row);
    if (row.children) {
      flatRows = flatRows.concat(flattenRows(row.children));
    }
  });
  return flatRows;
}

function calculateContribution(child, totalOriginal) {
  return totalOriginal ? getRowValue(child) / totalOriginal : 0;
}

function updateChildValues(children, parentValue) {
  const totalOriginal = children.reduce(
    (sum, child) => sum + getRowValue(child),
    0
  );
  return children.map((child) => {
    const contribution = calculateContribution(child, totalOriginal);
    return {
      ...child,
      modifiedValue: parseFloat((parentValue * contribution).toFixed(2)),
      children: child.children
        ? updateChildValues(child.children, parentValue * contribution)
        : [],
    };
  });
}

function updateRowValue(rows, rowId, value) {
  return rows.map((row) => {
    if (row.id === rowId) {
      let updatedRow = { ...row, modifiedValue: value };
      if (row.children) {
        updatedRow.children = updateChildValues(row.children, value);
      }
      return updatedRow;
    } else if (row.children) {
      return { ...row, children: updateRowValue(row.children, rowId, value) };
    }
    return row;
  });
}

function Table() {
  const [rows, setRows] = useState(tableData.rows);
  const [rowValues, setRowValues] = useState({});

  const handleNumberInput = useCallback((row) => {
    return (value) => {
      setRowValues((prevRowValues) => ({
        ...prevRowValues,
        [row.id]: value,
      }));
    };
  }, []);

  const handleAllocation = useCallback(
    (row, type) => {
      return () => {
        const inputNumber = rowValues[row.id];
        if (
          inputNumber !== undefined &&
          !isNaN(inputNumber) &&
          inputNumber >= 0
        ) {
          let newValue =
            row.modifiedValue !== undefined ? row.modifiedValue : row.value;
          if (type === "percentage") {
            newValue += (newValue * inputNumber) / 100;
          } else {
            newValue = inputNumber;
          }
          setRows((prevRows) => updateRowValue(prevRows, row.id, newValue));
        } else {
          alert("Please enter a valid number");
        }
      };
    },
    [rowValues]
  );

  const columns = useMemo(() => {
    return [
      { label: "Label", key: "label" },
      { label: "Value", key: "value", render: getRowValue },
      {
        label: "Input",
        key: "input",
        render: (row) => <NumericInput onChange={handleNumberInput(row)} />,
      },
      {
        label: "Allocation %",
        key: "allocationPercent",
        render: (row) => (
          <button
            type="button"
            onClick={handleAllocation(row, "percentage")}
            aria-label={`Allocate percentage to ${row.label}`}
          >
            Allocate %
          </button>
        ),
      },
      {
        label: "Allocation Val",
        key: "allocation_val",
        render: (row) => (
          <button
            type="button"
            onClick={handleAllocation(row, "value")}
            aria-label={`Allocate value to ${row.label}`}
          >
            Allocate Val
          </button>
        ),
      },
      {
        label: "Variance",
        key: "variance",
        render: (row) =>
          row.modifiedValue !== undefined ? row.modifiedValue - row.value : 0,
      },
      {
        label: "Variance %",
        key: "variancePercentage",
        render: (row) => {
          if (row.value === 0) return "-";
          const modifiedValue =
            row.modifiedValue !== undefined ? row.modifiedValue : row.value;
          return (
            (((modifiedValue - row.value) / row.value) * 100).toFixed(2) + "%"
          );
        },
      },
    ];
  }, [handleAllocation, handleNumberInput]);

  const flatRows = useMemo(() => flattenRows(rows), [rows]);

  const pieData = useMemo(() => {
    const threshold = 5; // Percentage threshold for grouping
    const total = flatRows.reduce((sum, row) => sum + getRowValue(row), 0);
    const groupedData = flatRows.reduce(
      (acc, row) => {
        const value = getRowValue(row);
        const percentage = (value / total) * 100;
        if (percentage < threshold) {
          acc.other += value;
        } else {
          acc.labels.push(row.label);
          acc.data.push(value);
        }
        return acc;
      },
      { labels: [], data: [], other: 0 }
    );

    if (groupedData.other > 0) {
      groupedData.labels.push("Other");
      groupedData.data.push(groupedData.other);
    }

    return {
      labels: groupedData.labels,
      datasets: [
        {
          data: groupedData.data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  }, [flatRows]);

  return (
    <div className={styles.tableContainer}>
      <div>
        <h2 className={styles.tableHeading}>Hierarchical Table</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow key={`row-${row.id}`} row={row} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.chartContainer}>
        <h3>Value Distribution</h3>
        <Pie data={pieData} />
      </div>
      <div className={styles.footer}>Made with love ❤️ by Viplove</div>
    </div>
  );
}

export default Table;
