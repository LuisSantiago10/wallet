interface SubcriptionCreateDto{
    code: string,
    user_id: number,
    amount: number,
    cron: string
}

interface SubcriptionUpdateDto{
    code: string,
    amount: number,
    cron: string
}