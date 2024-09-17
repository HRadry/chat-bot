// Function to format phone numbers
export function formatPhoneNumber(phoneNumber: string): string {
    // Check if the number starts with '521' and has 13 digits
    if (phoneNumber.startsWith('521') && phoneNumber.length === 13) {
        // Remove the '1' at position 3
        const formatted = phoneNumber.slice(0, 2) + phoneNumber.slice(3);
        return formatted;
    } else {
        // If it doesn't meet the condition, return the number as is
        return phoneNumber;
    }
}

// Function to validate phone numbers
export function validatePhoneNumber(phoneNumber: string): boolean {
    const re = /^\d{10,11}$/;
    return re.test(phoneNumber);
}
