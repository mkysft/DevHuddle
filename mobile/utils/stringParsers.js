export function getUserInitials(user) {
    const { firstName, lastName } = user;
    if (!firstName || !lastName) {
        return `?`;
    }
    return firstName.charAt(0) || "" + lastName.charAt(0);
}

export function getUserFullname(user) {
    const { firstName, lastName } = user;
    if (!firstName || !lastName) {
        const splitID = user?.id.split("-");
        return `User #${splitID[1]}-${splitID[2]}-${splitID[3]}`;
    }
    return firstName + " " + lastName;
}
