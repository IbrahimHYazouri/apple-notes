import bcrypt from "bcryptjs";
import prisma from "@/server/utils/prisma";

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body.password, salt);

		await prisma.user.create({
			data: {
			  email: body.email,
			  password: hashedPassword,
			  salt: salt
			},
		});

		return {data: 'success'};
	} catch(error) {
		if (error.code === 'P2002') {
			throw createError({
				statusCode: 409,
				message: 'An email with address already exists'
			})
		}
		throw error;
	}
});