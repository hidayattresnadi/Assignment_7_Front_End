import Label from "../elements/label";

const DataDetail = ({ label, value }) => {
    return (
        <div className="mb-3">
            <Label className="fw-bold">{label}:</Label> <Label>{value}</Label>
        </div>
    );
};

export default DataDetail;