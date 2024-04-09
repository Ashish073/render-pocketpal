export function convertDateTime(utcTimestamp: Date): string {
    const postDate = new Date(utcTimestamp);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate.getTime() - postDate.getTime();

    // Convert milliseconds to seconds
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    // Convert seconds to days
    const differenceInDays = Math.floor(differenceInSeconds / (24 * 60 * 60));

    // Convert seconds to hours
    const differenceInHours = Math.floor((differenceInSeconds % (24 * 60 * 60)) / (60 * 60));

    // Convert seconds to minutes
    const differenceInMinutes = Math.floor((differenceInSeconds % (60 * 60)) / 60);

    // Format the result based on the difference
    let formattedDateTime: string;
    if (differenceInDays > 0) {
        formattedDateTime = `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
    } else if (differenceInHours > 0) {
        formattedDateTime = `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
    } else if (differenceInMinutes > 0) {
        formattedDateTime = `${differenceInMinutes} minute${differenceInMinutes > 1 ? 's' : ''} ago`;
    } else {
        formattedDateTime = 'Just now';
    }

    return formattedDateTime;
}

export function formatDate(dateString: Date) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    const [month, day, year] = formattedDate.split(/\s*,?\s/);
    return { date: day, month, year };
}