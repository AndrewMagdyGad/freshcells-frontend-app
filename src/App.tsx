import { Routes, Route, Link } from "react-router-dom";
import SignIn from "./signin";
import Layout from "./Layout";
import Account from "./account";

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Account />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

export default App;
