import Calendar from "../components/Calendar/Calendar";
import Category from "../components/Category/Category";

const main = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: "15%" }}>
        <Category />
      </div>
      <div style={{ width: "85%" }}>
        <Calendar />
      </div>
    </div>
  );
};

export default main;
