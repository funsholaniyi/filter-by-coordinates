import { CustomerModel } from "../../models/customer.model";
import { CustomerService } from "../customer.service";
import { UtilityService } from "../utility.service";

const customerService = new CustomerService(new UtilityService())

describe("Text to customer", () => {
    it("should covert text string to customer object", async () => {
        const response = CustomerService.textToCustomer("id: e49a0a48-1889-4d3d-81a5-c1b2e5190922, lat: 54.10358839, long:9.29488901")
        expect(response).toEqual({id: "e49a0a48-1889-4d3d-81a5-c1b2e5190922", lat: "54.10358839", long: "9.29488901"})
    })

    it("should return an empty object", async () => {
        const response = CustomerService.textToCustomer("")
        expect(response).toEqual({})
    })
})

describe("Filter customer by distance", () => {
    it("should make sure customers has been loaded", async () => {
        expect(() => {
            return customerService.filterCustomerByDistance({
                "lat": 52.493256,
                "long": 13.446082
            }, 30)
        }).toThrow("Please load the customers data before calling the filter method")
    })
    it("should filter customers by distance", async () => {
        const customers = <CustomerModel[]>[
            {
                id: " ceaa3ede-1805-4c41-a2d1-79b1c74c033b",
                lat: 53.35397848,
                long: 13.2690475
            },
            {
                id: " d3b64719-3b9a-40b7-81e6-56dd94a5a794",
                lat: 52.51803419,
                long: 12.81343141
            },
            {
                id: " d5c05bd3-76d4-4c3c-9985-deb82751c611",
                lat: 52.62407672,
                long: 14.08227028
            }
        ]

        customerService.loadCustomers(customers)
        const response = customerService.filterCustomerByDistance({
            "lat": 52.493256,
            "long": 13.446082
        }, 50)
        expect(response).toEqual([
            {
                id: " d3b64719-3b9a-40b7-81e6-56dd94a5a794",
                lat: 52.51803419,
                long: 12.81343141
            },
            {
                id: " d5c05bd3-76d4-4c3c-9985-deb82751c611",
                lat: 52.62407672,
                long: 14.08227028
            }
        ])
    })


})
