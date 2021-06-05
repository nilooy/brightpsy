import {useTracker} from "meteor/react-meteor-data";

const { useLocation } = require("react-router-dom");

export const useSearchQuery = () => new URLSearchParams(useLocation().search);

export const useSubs = (name, collection, params, {
    authCheck = true, condition, deps, query = {}
} = {}) => {
    return useTracker(() => {
        let data = [];
        if ( (authCheck && !Meteor.user()) || condition) {
            return data;
        }
        const handler = Meteor.subscribe(name, params);

        if (!handler.ready()) {
            return { ...data, isLoading: true };
        }

        data = collection.find(query).fetch();

        return { data, isLoading: false };
    }, deps)
}
