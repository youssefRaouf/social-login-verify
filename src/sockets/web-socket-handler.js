import {types} from './types';

const getAllInvigilatorsRoomName = () => `invigilators`;
const getInvigilatorsScheduleGroupRoomName = (
  assessmentScheduleGroupId
) => `invigilators_${assessmentScheduleGroupId}`;
const getCandidatesScheduleGroupRoomName = (
  assessmentScheduleGroupId
) => `candidates_${assessmentScheduleGroupId}`;
const getCandidateSingleRoomName = (candidateId) =>
  `candidate_${candidateId}`;
const getOrganisationRoomName = (organisationId) =>
  `organisation_${organisationId}`;

class WebSocketHandler {
  socket;
  userId;
  userType;
  static io;

  constructor(
    socket,
    io,
    userId,
    userType
  ) {
    this.socket = socket;
    this.userId = userId;
    this.userType = userType;
    WebSocketHandler.io = io;
    this.attach();
  }

  attach() {
    this.socket.on(
      'connected',
      ({
        candidateId,
        invigilatorId,
        assessmentScheduleGroupId,
        organisationId
      }) => {
        // candidate
        if (candidateId) {
          this.socket.join(getCandidateSingleRoomName(candidateId));
          WebSocketHandler.sendCandidateActionToAllInvigilators({
            candidateId,
            organisationId,
            type: types.CANDIDATE_ACTION_ONLINE,
            payload: {
              online: true
            }
          });
        }
        // invigilator
        if (invigilatorId) {
          this.socket.join(getAllInvigilatorsRoomName());
          this.socket.join(
            getInvigilatorsScheduleGroupRoomName(assessmentScheduleGroupId)
          );
        }
      }
    );

    this.socket.on('disconnect', async () => {      
      WebSocketHandler.sendCandidateActionToAllInvigilators({
        candidateId: this.userId,
        type: types.CANDIDATE_ACTION_OFFLINE,
        payload: {
          online: false
        }
      });
    });

    this.socket.on('candidate_action', (data) => {
      switch (data.type) {
        case types.CANDIDATE_ASSESSMENT_JOIN: {
          this.socket.join(
            getCandidatesScheduleGroupRoomName(data.assessmentScheduleGroupId)
          );
          break;
        }
        case types.CANDIDATE_ASSESSMENT_LEAVE: {
          this.socket.leave(
            getCandidatesScheduleGroupRoomName(data.assessmentScheduleGroupId)
          );
          break;
        }
        case types.CANDIDATE_ACTION_REQUEST_NEEDED: {
          data.payload.request.createdAt = new Date().toISOString();
          break;
        }
        case types.SUBMIT_SUCCESS:
        case types.SUBMIT_ERROR:
        case types.SAVE_SUCCESS:
        case types.SAVE_ERROR:
        case types.ASSESSMENT_FOCUSED:
        case types.ASSESSMENT_BLURRED: {
          log(data);
          return;
        }
      }
      WebSocketHandler.sendCandidateActionToGroupInvigilators(data);
    });

    this.socket.on('invigilator_action', (data) => {
      if (data.candidateId) {
        WebSocketHandler.sendInvigilatorActionToSingleCandidate(data);
      } else {
        const startEndAssessment = async (key) => {
          const payload = {
            
          };
          WebSocketHandler.sendCandidateActionToAllInvigilators({
            ...data,
            payload
          });
        };
        if (
          data.type === types.INVIGILATOR_ACTION_START_ASSESSMENT
        ) {
          startEndAssessment('startedAt');
        } else if (
          data.type === types.INVIGILATOR_ACTION_END_ASSESSMENT
        ) {
          startEndAssessment('endedAt');
        }
        WebSocketHandler.sendInvigilatorActionToGroupCandidates(data);
      }
    });
  }

  static sendCandidateActionToAllInvigilators(data) {
    WebSocketHandler.io
      .to(getAllInvigilatorsRoomName())
      .emit('candidate_action', data);
    log(data);
  }

  static sendCandidateActionToGroupInvigilators(data) {
    WebSocketHandler.io
      .to(getInvigilatorsScheduleGroupRoomName(data.assessmentScheduleGroupId))
      .emit('candidate_action', data);
    log(data);
  }

  static sendInvigilatorActionToGroupCandidates(data) {
    WebSocketHandler.io
      .to(getCandidatesScheduleGroupRoomName(data.assessmentScheduleGroupId))
      .emit('invigilator_action', data);
    log(data);
  }

  static sendInvigilatorActionToSingleCandidate(data) {
    WebSocketHandler.io
      .to(getCandidateSingleRoomName(data.candidateId))
      .emit('invigilator_action', data);
    log(data);
  }
}

export default WebSocketHandler;
