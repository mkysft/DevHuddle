export function getUserInitials(user) {
    const { firstName, lastName } = user;
    return firstName.charAt(0) + lastName.charAt(0);
}

export function getUserFullname(user) {
    const { firstName, lastName } = user;
    return firstName + " " + lastName;
}
