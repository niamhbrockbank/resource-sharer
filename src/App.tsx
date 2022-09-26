import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewResource from "./components/CreateNewResource";
import ResourceList from "./components/ResourceList";

function App(): JSX.Element {
  return (
    <div>
      <ResourceList />
      <CreateNewResource />
    </div>
  );
}

export default App;
