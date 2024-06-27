import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogHandler from "./handler/send-console-log.handler";
import SendConsoleLog1Handler from "./handler/send-console-log1.handler";
import SendConsoleLog2Handler from "./handler/send-console-log2.handler";

describe("Customer Send Console Log events tests", () => {
    it("should register a customer send console log handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    });

    it("should unregister a customer send console log", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
            0
        );
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const customer = new Customer('1', 'Jonas Augusto');
        const address = new Address('Rua Sergipe', 100, '055079-000', 'Itabaiana');
        customer.changeAddress(address);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.Address
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledWith({
            "dataTimeOccurred": expect.any(Date),
            "eventData": {
                "address": expect.objectContaining({
                    "_city": "Itabaiana",
                    "_number": 100,
                    "_street": "Rua Sergipe",
                    "_zip": "055079-000"
                }),
                "id": "1",
                "name": "Jonas Augusto"
            }
        });
        expect(spyConsoleLog).toHaveBeenCalledWith('Endereço do cliente: 1, Jonas Augusto alterado para: Rua Sergipe, 100, 055079-000 Itabaiana');
        spyConsoleLog.mockRestore();
    });
});

describe("Customer Send Console Log1 events tests", () => {
    it("should register a customer send console log1 handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    });

    it("should unregister a customer send console log1 handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
            0
        );
    });

    it("should unregister all customer send console log1 handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeUndefined();
    });

    it("should notify all customer send console log1 handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Jonas Augusto",
            address: new Address("Rua Sergipe", 100, "055079-000", "Itabaiana")
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

        expect(spyConsoleLog).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated');
        spyConsoleLog.mockRestore();
    });
});

describe("Customer Send Console Log2 events tests", () => {
    it("should register a customer send console log2 handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    });

    it("should unregister a customer send console log2 handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
            0
        );
    });

    it("should unregister all customer send console log2 handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeUndefined();
    });

    it("should notify all customer send console log2 handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Jonas Augusto",
            address: new Address("Rua Sergipe", 100, "055079-000", "Itabaiana")
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

        expect(spyConsoleLog).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated');

        spyConsoleLog.mockRestore();
    });
});
