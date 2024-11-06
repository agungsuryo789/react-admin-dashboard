import DashboardLayout from "../../component/dashboardLayout";
import Table from "../../component/table";

const Home = () => {
  return (
    <>
      <DashboardLayout>
        <div className="content-center p-4">
          <Table />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Home;
