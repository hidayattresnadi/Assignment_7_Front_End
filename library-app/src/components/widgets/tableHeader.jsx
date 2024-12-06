const TableHeader = ({ columns }) => (
    <thead className="table-dark">
        <tr>
            {columns.map((col, index) => (
                <th key={index}>{col}</th>
            ))}
        </tr>
    </thead>
);

export default TableHeader;

