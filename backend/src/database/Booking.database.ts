/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBindParams } from '@/helpers/util';
import Database from './Database';
import { FlyBookingCreate, FlyBookingResponse } from '@/interfaces/types/booking.type';

class BookingDatabase extends Database {

	async createFlyBooking(data: FlyBookingCreate) {
		const mysqlBind = createBindParams(data);

		return await this.query(`INSERT INTO \`booking_fly\` SET ${mysqlBind};`, Object.values(data));
	}

	async fetchFlyBooking(id: number): Promise<FlyBookingResponse | null> {
		const rows: any = await this.query('SELECT * FROM `booking_fly` WHERE id = ?;', [id]);

		return rows[0]?.length > 0 ? {
			...rows[0][0],
			data: rows[0][0]
		} : null;
	}

	async fetchAllFlyBookings(): Promise<Array<FlyBookingResponse>> {
		const rows: any = await this.query(
			'SELECT * FROM `booking_fly` ORDER BY register_date DESC;', 
			[]
		);

		return rows[0]?.length > 0 ? rows[0].map((row: any) => ({
			...row,
			data: JSON.parse(row.data)
		})) : [];
	}

}

export default BookingDatabase; 