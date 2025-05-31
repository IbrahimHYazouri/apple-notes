import prisma from "@/server/utils/prisma";

export default defineEventHandler(async (event) => {
	try {
		const notes = await prisma.note.findMany();

		return notes;
	} catch(error) {
		console.log(error)
	}
})