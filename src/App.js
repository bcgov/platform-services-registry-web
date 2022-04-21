import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const USERS = gql`
  query GetUsers {
    users {
      id
      firstName
    }
  }
`;

const ME = gql`
  query GetMe {
    me {
      id
      firstName
      lastName
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ id, firstName }) => (
    <div key={id}>
      <p>
        {id}
        <br />
        {firstName}
      </p>
    </div>
  ));
}

function Me() {
  const { loading, error, data } = useQuery(ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    !!data.me && (<div>
      {data.me.id}
      <br />
      {data.me.firstName}
      <br />
      {data.me.lastName}
    </div>)
  );
}

function App() {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h2>My first Apollo app 🚀</h2>
      <Users />
      <Me/>
    </div>
  );
}

export default App;
