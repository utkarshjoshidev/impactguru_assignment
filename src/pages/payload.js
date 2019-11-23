import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Launchpads extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      payloadData: {},
      error: false,
      payloadId: props.match.params.payload
    };
  }

  handleChange = stateChanged => {
    this.setState(stateChanged);
  };

  componentDidMount() {
    const { payloadId } = this.state;
    axios
      .get(`https://api.spacexdata.com/v3/payloads/` + payloadId)
      .then(res => {
        const payloadData = res.data;
        let error = false;
        if ("error" in payloadData) {
          error = true;
        }
        this.setState({
          payloadData,
          loading: false,
          error
        });
      })
      .catch(e => {
        this.setState({
          error: true
        });
      });
  }

  render() {
    const { loading, payloadData, error } = this.state;

    if (error) {
      return "Payload is not present or some error has occured. Please try again.";
    }

    if (loading) {
      return "Loading payload....";
    }

    return (
      <div>
        <h3>Payload</h3>
        <div className="card payload-width">
          <div className="card-title">
            <span>{payloadData.payload_id}</span>
          </div>
          <div className="card-body">
            <table>
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>{payloadData.payload_type}</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>{payloadData.manufacturer}</td>
                </tr>
                <tr>
                  <td>Nationality</td>
                  <td>{payloadData.nationality}</td>
                </tr>
                <tr>
                  <td>Customers</td>
                  <td>
                    {!!payloadData.customers && payloadData.customers.length
                      ? payloadData.customers.join(", ")
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Norad Id</td>
                  <td>
                    {!!payloadData.norad_id && payloadData.norad_id.length
                      ? payloadData.norad_id.join(", ")
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Orbit</td>
                  <td>{payloadData.orbit}</td>
                </tr>
                <tr>
                  <td>Payload Mass Kg</td>
                  <td>{payloadData.payload_mass_kg}</td>
                </tr>
                <tr>
                  <td>Payload Mass lbs</td>
                  <td>{payloadData.payload_mass_lbs}</td>
                </tr>
              </tbody>
            </table>

            <div className="card-small-title m-tb-25 ">Orbit params</div>
            <table>
              <tbody>
                {payloadData.orbit_params
                  ? Object.keys(payloadData.orbit_params).map((key, index) => (
                      <tr key={index}>
                        <td>
                          {(key.charAt(0).toUpperCase() + key.slice(1))
                            .split("_")
                            .join(" ")}
                        </td>
                        <td>{payloadData.orbit_params[key]}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Launchpads;
