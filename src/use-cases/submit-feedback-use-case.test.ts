import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendEmail: sendMailSpy },
    
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {        

        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'example teste',
            screenshot:'test.jpg'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled(),
        expect(sendMailSpy).toHaveBeenCalled()
    }),

    it('should be able to submit a feedback without type', async () =>{        

        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'example teste',
            screenshot:'test.jpg'
        })).rejects.toThrow()
    }),

    it('should be able to submit a feedback without comment', async () =>{        

        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'tss',
            screenshot:'test.jpg'
        })).rejects.toThrow()
    }),

    it('should be able to submit a feedback without invalid screenshot format', async () =>{        

        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'comment test',
            screenshot:'test.jpg'
        })).rejects.toThrow()
    })
})