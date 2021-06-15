import { CoordinateModel } from "../models/utility.model";

export class UtilityService {
    private R = 6371; // Radius of the earth in km
    /**
     *
     * @param deg
     * @private
     */
    private static degreeToRadians(deg: number) {
        return deg * (Math.PI / 180);
    }

    /**
     * get distance between two coordinates in kilometers based on the Haversine formula -  https://en.wikipedia.org/wiki/Haversine_formula
     * @param start
     * @param stop
     */
    public getDistanceFromLatLonInKm(start: CoordinateModel, stop: CoordinateModel) {
        const latDiff = UtilityService.degreeToRadians(stop.lat - start.lat);  // deg2rad below
        const longDiff = UtilityService.degreeToRadians(stop.long - start.long);

        const a =
            Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
            Math.cos(UtilityService.degreeToRadians(start.lat)) * Math.cos(UtilityService.degreeToRadians(stop.lat)) *
            Math.sin(longDiff / 2) * Math.sin(longDiff / 2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // Distance in km
        return this.R * c;
    }
}
