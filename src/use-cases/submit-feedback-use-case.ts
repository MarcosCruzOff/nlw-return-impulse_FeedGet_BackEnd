import { MailAdapter } from '../adapters/email-adapter'
import { FeedbacksRepository } from '../repositories/feedbacks-repository'

export interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendEmail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family:sans-serif; font-size: 16px; color: #222">`,
                `<p>Tipo do Feedback: ${type}</p>`,
                `<p>Comentário do Feedback: ${comment}</p>`,
                `<img src="${screenshot}"/>`,
                `</div>`
            ].join('\n')
        })
    }
}
