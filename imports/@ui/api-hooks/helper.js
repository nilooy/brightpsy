const { useLocation } = require("react-router-dom");

export const useSearchQuery = () => new URLSearchParams(useLocation().search);
