import {useMemo} from "react";

export const useSearchedReports = (reports, query) => {
    const searchedReports = useMemo(() => {
        return reports.filter(report => report.name.toLowerCase().includes(query.toLowerCase())
            || report.description.toLowerCase().includes(query.toLowerCase()));
    }, [reports, query])
    return searchedReports;
}