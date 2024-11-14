import { api } from "api";

export async function getGroupAnalytics(group, endDate, startDate) {
    const response = await api.get("/get-group-analysis", {
        params: {
            groupId: group,
            endDate: endDate,
            startDate: startDate
        },
      });
      return response.data;
}

export async function getUserAnalysis(user, endDate, startDate) {
    const response = await api.get("/get-user-analysis", {
        params: {
            user: user,
            endDate: endDate,
            startDate: startDate
        },
      });
      return response.data;
}