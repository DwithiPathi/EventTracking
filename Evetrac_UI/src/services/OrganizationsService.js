import axios from "axios";

const URL = "http://localhost:9090/getAllOrganizations";

class OrganizationsService {
  getAllOrganizations() {
    return axios.get(URL);
  }
}
export default new OrganizationsService();
