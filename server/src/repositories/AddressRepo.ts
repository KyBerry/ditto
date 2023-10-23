import type { AddressInput } from '../types/__generated__/resolvers-types'
import db from '../db'

export class AddressRepo {
  async getAllCountries() {
    const { rows: countries } = await db.query(`
      SELECT * FROM country 
    `)

    return countries
  }
  async assignBusinessToAddress(businessId: number, addressId: number) {
    const { rows } = await db.query(
      `
      INSERT INTO business_address (business_id, address_id)
      VALUES ($1, $2);
    `,
      [businessId, addressId],
    )
    return rows
  }
  async createAddress({
    city,
    countryId,
    postalCode,
    region,
    street1,
    street2,
  }: AddressInput) {
    const {
      rows: [{ address_id: addressId }],
    } = await db.query(
      `
      INSERT INTO address (city, country_id, postal_code, region, street_1, street_2)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING address_id
    `,
      [city, countryId, postalCode, region, street1, street2],
    )
    return addressId
  }
}

export default new AddressRepo()
