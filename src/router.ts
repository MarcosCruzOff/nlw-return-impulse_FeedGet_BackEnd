import express from 'express'

import { NodeMailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-respository'

export const router = express.Router()

router.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    
    // Enviando email
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

    const nodemailerMailAdapter = new NodeMailerAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send()
})
