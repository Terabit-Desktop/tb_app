export class RandomMessages
{
    private static messages: string[] = [
        "Hewwo cutie! If you needa little help, and are confuzzled, I'm right here to hewp yew! UwU - Joker119",
        "I want a sloppy toppy from my imaginary girlfriend but she isn't real so cope. - Kali",
        "You can't fix stupid, even with duct-tape. - Alex",
        "I don't know what to really say about the allegations. - nystigmus",
        "ngl idk what i'd even want to give. - ced777ric",
        "I thought Terabit was a charity. - Michael",
        "86% joker stinky lol. - Floofie",
        "There will also be a large bonfire for you to dispose of your cum soaked fursuits. - Michael", // I don't know about this one but it's funny, so it's staying.
        "cmg is all of our dad, that's why he's always disappointed. - Michael",
        "Thank you joker ur so daddy. - Kali",
        "I'm a straight male, I don't tuck anything. - Kali",
        "dammit joker, joker broke it again, cope. - cmg"
    ];
    
    public static GetRandomMessage(): string { return this.messages[Math.floor(Math.random() * this.messages.length)]; }
}