import React from "react";
import axios from "axios";

class Launchpads extends React.Component {
  state = {
    loading: true,
    launchpads: [],
    statuses: [],
    selectedStatus: "all",
    currentLaunchpads: []
  };

  handleChange = stateChanged => {
    this.setState(stateChanged);
  };

  componentDidMount() {
    axios.get(`https://api.spacexdata.com/v3/launchpads`).then(res => {
      const launchpads = res.data;

      let statuses = [];

      res.data.map(data => {
        if (!statuses.includes(data.status)) {
          statuses.push(data.status);
        }
      });

      this.setState({
        launchpads,
        currentLaunchpads: launchpads,
        loading: false,
        statuses
      });
    });
  }

  filterLaunchPad = status => {
    const { launchpads } = this.state;

    let currentLaunchpads = [...launchpads];

    if (status != "all") {
      currentLaunchpads = launchpads.filter(data => data.status == status);
    }

    this.setState({
      currentLaunchpads,
      selectedStatus: status
    });
  };

  render() {
    const { loading, currentLaunchpads, statuses, selectedStatus } = this.state;

    if (loading) {
      return "Loading launchpad....";
    }

    return (
      <div>
        <h3>Launchpads</h3>
        <div className="filter">
          <label>Status Filter</label>
          <select
            id="filters"
            name="filters"
            onChange={e => {
              this.filterLaunchPad(e.target.value);
            }}
            value={selectedStatus}
          >
            <option value="all">All</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-container">
          {currentLaunchpads.map((data, index) => {
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
                  <span
                    className={"status " + status}
                    title={data.status}
                  ></span>
                  <span>{data.name}</span>
                </div>
                <div className="card-body">
                  <div className="card-small-title">Launch Details</div>
                  <p>
                    {data.location.name} - {data.location.region}
                    <br />
                    lat: {data.location.latitude}, long:{" "}
                    {data.location.longitude}
                  </p>

                  <p className="discription">{data.details}</p>
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
