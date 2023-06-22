import axios from "axios";

const URL = "http://localhost:9090";

class EventService {
  getAllEvents() {
    return axios.get(`${URL}/getAllUpcomingEvents`);
  }
  getAllPreviousEventsEvents() {
    return axios.get(`${URL}/getAllPreviousEvents`);
  }
  getAllWishlistedEvents(userId) {
    return axios.get(`${URL}/getAllWishlistedEvents?userId=${userId}`);
  }
  getEventDetails(eventId) {
    return axios.get(`${URL}/getEventByEventId?eventId=${eventId}`);
  }
  getAllEventsByOrganizationName(userId) {
    return axios.get(`${URL}/getEventByUserId?userId=${userId}`);
  }

  createEvent(event, formData) {
    // return axios.post(`${URL}/addNewEvent`, formData, {
    //   headers: {
    //     'Content-Type': undefined
    //   },
    //   data: "JSON.stringify(event)"
    // });
    return axios.post(`${URL}/addNewEvent`, formData);
   
    //return axios.post(`${URL}/addNewFile`,formData);

    //  return fetch(`${URL}/addNewEvent`, {
    //     method: 'POST',
    //     body: formData
    //   })
  }
  updateEvent(event, formData) {
    // return axios.post(`${URL}/addNewEvent`, formData, {
    //   headers: {
    //     'Content-Type': undefined
    //   },
    //   data: "JSON.stringify(event)"
    // });
    return axios.put(`${URL}/updateEventDetails`, formData);
    //return axios.post(`${URL}/addNewFile`,formData);

    //  return fetch(`${URL}/addNewEvent`, {
    //     method: 'POST',
    //     body: formData
    //   })
  }
  deleteEvent(deleteEventId){
    return axios.delete(`${URL}/deleteEvent?eventId=${deleteEventId}`);
  }
}

export default new EventService();
