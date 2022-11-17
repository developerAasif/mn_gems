import Session from "./session";

const axios = require("axios");

var helper = {
  get_cookie: function (name) {
    return document.cookie.split(";").some((c) => {
      return c.trim().startsWith(name + "=");
    });
  },
  delete_cookie: function (name, path, domain) {
    if (helper.get_cookie(name)) {
      document.cookie =
        name +
        "=" +
        (path ? ";path=" + path : "") +
        (domain ? ";domain=" + domain : "") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  },

  //all api methods
  api: async (path, method, data) => {
    try {
      var config = {
        method: method,
        url: path,
        data: data,
        headers: { 
          'Authorization': 'codingfunz@123'
        }
      };

      const result = await axios(config);
      if (result?.data?.ResponseCode?.includes("200")) {
        return result?.data;
      } else if (result?.data?.ResponseCode === '502'&&result?.data?.Message==='Session disconnected, please login.') {
        Session.clearAllSession()
        window.location.reload()

      } else {
        return result?.data;
      }
    } catch (error) {
      console.log("err in api==>>>::", error);
      return error;
    }
  },
};

export default helper;
