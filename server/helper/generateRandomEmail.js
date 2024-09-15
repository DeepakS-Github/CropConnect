const generateRandomEmail = () => {
    const random = Math.random().toString(36).substring(7);
    return `${random}@test.com`;
}