import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import {Validator} from 'sureform';
import prisma from "@/server/utils/prisma";

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		const schema = {
			email: ['required', 'email'],
			password: ['required', 'min:8']
		};

		const messages = {
			'email.email': 'Invalid email, please change.',
		}	

		const validator = new Validator(body, schema, messages);
		const result = validator.validate();
		
		if (!result.valid) {
			let message = 'Error';
			if (result.errors?.email) {
				message = result.errors?.email[0];
			} else if(result.errors?.password) {
				message = result.errors?.password[0]
			}
			throw createError({
				statusCode: 400,
				message: message
			})
		}

		const user = await prisma.user.findUnique({
			where: {
			  email: body.email
  			},
		});

		if (!user) {
			throw createError({
				statusCode: 400,
				message: 'Email or password is invalid'
			})
		}

		const isValid = await bcrypt.compare(body.password, user?.password);

		if (!isValid) {
			throw createError({
				statusCode: 400,
				message: 'Email or password is invalid'
			})
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
		setCookie(event, 'NoteNestJWT', token)

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