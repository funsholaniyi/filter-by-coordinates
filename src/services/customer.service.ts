import { CustomerModel } from "../models/customer.model";
import { CoordinateModel } from "../models/utility.model";
import { UtilityService } from "./utility.service";


export class CustomerService {
    private customers: CustomerModel[] = [];

    /**
     *
     * @param utilityService
     */
    public constructor(private utilityService: UtilityService) {
    }

    /**
     * Converts data str to customer object
     * @param customerStr
     */
    public static textToCustomer(customerStr: string): CustomerModel {
        const result: any = {};
        if(!customerStr){
            return result;
        }
        const dataPoints = customerStr.split(",");
        dataPoints.forEach(item => {
            item = item.trim();
            const items = item.split(":")
            const key = items[0];
            const value = items[1];
            result[key] = value;
        })
        return <CustomerModel>result;
    }

    public loadCustomers(customers: CustomerModel[]) {
        this.customers = customers;
    }

    /**
     * Filters list of object customers by start coordinates and distance
     * @param startCoordinates
     * @param distance
     */
    public filterCustomerByDistance(startCoordinates: CoordinateModel, distance: number): CustomerModel[] {
        if(!this.customers.length){
            throw 'Please load the customers data before calling the filter method';
        }
        const filtered = this.customers.filter((customer: CustomerModel) => {
            const {id, ...stopCoordinates} = customer;
            const distanceDifference = this.utilityService.getDistanceFromLatLonInKm(startCoordinates, stopCoordinates);
            return distanceDifference <= distance;
        })

        return CustomerService.sortCustomersById(filtered);
    }

    /**
     *
     * @param customers
     * @private
     */
    private static sortCustomersById(customers: CustomerModel[]): CustomerModel[] {
        if(!customers.length){
            return customers;
        }
        return customers.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            } else if (a.id > b.id) {
                return 1;
            } else {
                return 0;
            }
        })
    }

}
