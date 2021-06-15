import * as fs from "fs";
import { CoordinateModel } from "./models/utility.model";
import { CustomerService } from "./services/customer.service";
import { UtilityService } from "./services/utility.service";

const dataFilepath = "./customers.txt";
const companyLocation: CoordinateModel = {
    "lat": 52.493256,
    "long": 13.446082
};
const distanceLimit = 100;

const utilityService = new UtilityService();
const customerService = new CustomerService(utilityService);

function start() {
    try {
        // Check that the file exists locally
        if (!fs.existsSync(dataFilepath)) {
            console.log("Data file could not be loaded. Please check name or path");
        } else {
            // gets data from file
            const text = fs.readFileSync(dataFilepath, "utf-8");
            const textByLine = text.split(",\n");

            // format file content and load into service
            let customers = textByLine.map(line => CustomerService.textToCustomer(line))
            customerService.loadCustomers(customers);

            // filter as needed
            customers = customerService.filterCustomerByDistance(companyLocation, distanceLimit);
            return customers;
        }

    } catch (e) {
        console.log("Application failed to start; Reason: ", e);
    }

}

const customers  = start();
console.log(customers)
