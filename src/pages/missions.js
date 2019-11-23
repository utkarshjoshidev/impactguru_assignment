import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Launchpads extends React.Component {
  state = {
    loading: true,
    missions: [],
    statuses: [],
    selectedStatus: "all",
    currentLaunchpads: []
  };

  handleChange = stateChanged => {
    this.setState(stateChanged);
  };

  componentDidMount() {
    axios.get(`https://api.spacexdata.com/v3/missions`).then(res => {
      const missions = res.data;

      this.setState({
        missions,
        loading: false
      });
    });
  }

  render() {
    const { loading, missions } = this.state;

    if (loading) {
      return "Loading missions....";
    }

    return (
      <div>
        <h3>Missions</h3>
        <div className="flex-container">
          {missions.map((data, index) => {
            let status = "bg-grey";

            switch (data.status) {
              case "active":
                status = "active";
                break;
              case "retired":
                status = "danger";
                break;
              case "under construction":
                status = "bg-orange";
                break;
            }

            return (
              <div className="card" key={index}>
                <div className="card-title">
                  <span>{data.mission_name}</span>
                </div>
                <div className="card-body">
                  <p className="discription">{data.description}</p>
                  <div className="card-small-title">Payload Ids</div>
                  <ul className="payload-ids">
                    {data.payload_ids.map((payload, index) => (
                      <li key={index}>
                        <Link to={"/payload/" + payload}>{payload}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Launchpads;
