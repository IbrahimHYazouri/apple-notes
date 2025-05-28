import prisma from "@/server/utils/prisma"

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const user = await prisma.user.create({
		data: {
		  email: body.email,
		  password: body.password,
		},
	});

	return {data: 'success'}
});