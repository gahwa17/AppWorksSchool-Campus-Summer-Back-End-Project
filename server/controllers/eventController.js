const errorHandler = require("../../util/error_handler");
const { extractUserIdFromToken } = require("../../util/common");

const Event = require("../models/eventModel");
const { getUserById } = require("../models/userModel");

module.exports = {
  getEvent: async (req, res) => {
    try {
      const receiver_id = extractUserIdFromToken(req);
      const eventResults = await Event.getEventByReceiver(receiver_id);
      if (eventResults.length == 0)
        return res.status(200).json({ message: "Currently no event..." });
      try {
        const results = await Event.getEvent(receiver_id);

        const responseData = {
          data: {
            events: [],
          },
        };

        for (const event of results) {
          const eventDetail = {
            id: Number(event.id),
            type: event.type,
            is_read: event.is_read,
            image: event.picture,
            created_at: event.created_at,
            summary: event.summary,
          };
          responseData.data.events.push(eventDetail);
        }
        // Need refactor: fi xN+1 problem
        // const eventDetails = eventResults.map(async (event) => {
        //     const sender = await getUserById(event.sender_id);
        //     return {
        //       id: Number(event.id),
        //       type: event.type,
        //       is_read: event.is_read,
        //       image: sender.picture,
        //       created_at: event.created_at,
        //       summary: event.summary
        //     };
        // });

        // const resolvedEventDetails = await Promise.all(eventDetails);

        res.status(200).json(responseData);
      } catch (error) {
        console.error(error);
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  readEvent: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const eventID = Number(req.params.event_id);
      if (!eventID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }
      try {
        const eventExist = await Event.getEventById(eventID);
        if (!eventExist) {
          return errorHandler.handleClientError(res, "eventNotExist", 400);
        }

        if (eventExist.receiver_id != userId) {
          return errorHandler.handleClientError(res, "notReceiverEvent", 400);
        }

        const result = await Event.setEventRead(eventID, userId);
        if (result.changedRows == 0) {
          return errorHandler.handleClientError(res, "eventAlreadyRead", 400);
        }

        const responseData = {
          data: {
            event: {
              id: eventID,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
};
