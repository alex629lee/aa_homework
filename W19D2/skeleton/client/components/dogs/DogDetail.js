import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import DogEdit from "./DogEdit";

const FETCH_DOG = gql`
  query FetchDog($id: ID!) {
    dog(_id: $id) {
      _id
      name
      breed
    }
  }
`;

const DogDetail = props => (
  <Query query={FETCH_DOG} variables={{ id: props.match.params.dogId }}>
    {({ loading, error, data }) => {
      console.log(data);

      if (loading) return <h1>Loading...</h1>;
      if (error) return <h1>{error}</h1>;
      return (
        <div>
          <h1>DogDetail</h1>
          <ul>
            <li key="detail-1">{data.dog.name}</li>
            <li key="detail-2">{data.dog.breed}</li>
          </ul>

          <DogEdit dog={data.dog} />
        </div>
      );
    }}
  </Query>
);
export default DogDetail;

