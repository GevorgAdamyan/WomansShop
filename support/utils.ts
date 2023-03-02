export default class Utils {
    static getUsername(email: string): string {
        let atIndex = email.indexOf('@');
        return email.slice(0, atIndex);
    }

    static getPrice(priceAsString: string): any {
        let match = priceAsString.match(/\d+(\.\d+)?/);
        let number = match ? parseFloat(match[0]) : null;
        return number;
    }
}
