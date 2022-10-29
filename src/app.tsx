import "./styles.css";
import Tabs from "./components/tabs";
import Footer from "./components/footer";
import Header from "./components/header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Tabs />
      <Footer />
    </div>
  );
}
