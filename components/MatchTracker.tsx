import { Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MatchRound } from '../types';

type Props = {
  selectedActivity: string | null;

  matchTeamOneName: string;
  setMatchTeamOneName: Dispatch<SetStateAction<string>>;

  matchTeamTwoName: string;
  setMatchTeamTwoName: Dispatch<SetStateAction<string>>;

  matchTeamOneGames: string;
  setMatchTeamOneGames: Dispatch<SetStateAction<string>>;

  matchTeamTwoGames: string;
  setMatchTeamTwoGames: Dispatch<SetStateAction<string>>;

  matchRounds: MatchRound[];
  setMatchRounds: Dispatch<SetStateAction<MatchRound[]>>;
};

const matchActivities = ['Padel', 'Tennis'];

export default function MatchTracker(props: Props) {
  if (!props.selectedActivity || !matchActivities.includes(props.selectedActivity)) {
    return null;
  }

  const addMatchRound = () => {
    const cleanTeamOneGames = props.matchTeamOneGames.trim();
    const cleanTeamTwoGames = props.matchTeamTwoGames.trim();

    if (cleanTeamOneGames === '') {
      alert('Please enter Team 1 games');
      return;
    }

    if (cleanTeamTwoGames === '') {
      alert('Please enter Team 2 games');
      return;
    }

    const teamOneNumber = Number(cleanTeamOneGames);
    const teamTwoNumber = Number(cleanTeamTwoGames);

    if (Number.isNaN(teamOneNumber) || Number.isNaN(teamTwoNumber)) {
      alert('Games must be numbers');
      return;
    }

    if (teamOneNumber > 6 || teamTwoNumber > 6) {
      alert('Each round should be 6 games or less');
      return;
    }

    const newRound: MatchRound = {
      id: Date.now(),
      teamOneGames: cleanTeamOneGames,
      teamTwoGames: cleanTeamTwoGames,
    };

    props.setMatchRounds([...props.matchRounds, newRound]);
    props.setMatchTeamOneGames('');
    props.setMatchTeamTwoGames('');
  };

  const deleteMatchRound = (roundId: number) => {
    const newRounds = props.matchRounds.filter((round) => round.id !== roundId);
    props.setMatchRounds(newRounds);
  };

  const getMatchTeamOneTotal = () => {
    return props.matchRounds.reduce((total, round) => {
      return total + Number(round.teamOneGames || 0);
    }, 0);
  };

  const getMatchTeamTwoTotal = () => {
    return props.matchRounds.reduce((total, round) => {
      return total + Number(round.teamTwoGames || 0);
    }, 0);
  };

  return (
    <View style={styles.detailsBox}>
      <Text style={styles.detailsTitle}>{props.selectedActivity} Match</Text>

      <TextInput
        style={styles.input}
        placeholder="Team 1 name"
        placeholderTextColor="#8f8f92"
        value={props.matchTeamOneName}
        onChangeText={props.setMatchTeamOneName}
      />

      <TextInput
        style={styles.input}
        placeholder="Team 2 name"
        placeholderTextColor="#8f8f92"
        value={props.matchTeamTwoName}
        onChangeText={props.setMatchTeamTwoName}
      />

      <Text style={styles.detailsSubtitle}>Add round score</Text>

      <View style={styles.scoreRow}>
        <TextInput
          style={styles.scoreInput}
          placeholder="Team 1 games"
          placeholderTextColor="#8f8f92"
          value={props.matchTeamOneGames}
          onChangeText={props.setMatchTeamOneGames}
          keyboardType="number-pad"
        />

        <TextInput
          style={styles.scoreInput}
          placeholder="Team 2 games"
          placeholderTextColor="#8f8f92"
          value={props.matchTeamTwoGames}
          onChangeText={props.setMatchTeamTwoGames}
          keyboardType="number-pad"
        />
      </View>

      <TouchableOpacity style={styles.addExerciseButton} onPress={addMatchRound}>
        <Text style={styles.buttonText}>+ Add Round</Text>
      </TouchableOpacity>

      <View style={styles.exerciseListBox}>
        <Text style={styles.exerciseListTitle}>Rounds Added</Text>

        {props.matchRounds.length === 0 ? (
          <Text style={styles.emptyHistory}>No rounds added yet</Text>
        ) : (
          props.matchRounds.map((round, index) => (
            <View key={round.id} style={styles.exerciseRow}>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>
                  Round {index + 1}: {round.teamOneGames} - {round.teamTwoGames}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.exerciseDeleteButton}
                onPress={() => deleteMatchRound(round.id)}
              >
                <Text style={styles.exerciseDeleteText}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <View style={styles.matchTotalBox}>
        <Text style={styles.matchTotalTitle}>Total Games</Text>
        <Text style={styles.matchTotalText}>
          {props.matchTeamOneName || 'Team 1'}: {getMatchTeamOneTotal()}
        </Text>
        <Text style={styles.matchTotalText}>
          {props.matchTeamTwoName || 'Team 2'}: {getMatchTeamTwoTotal()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsBox: {
    backgroundColor: '#1f1f22',
    padding: 18,
    borderRadius: 16,
    marginBottom: 22,
  },
  detailsTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  detailsSubtitle: {
    color: '#b8b8bb',
    fontSize: 16,
    marginBottom: 12,
    marginTop: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    marginBottom: 12,
    color: '#000000',
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 10,
  },
  scoreInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    color: '#000000',
  },
  addExerciseButton: {
    backgroundColor: '#5a5a5d',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 14,
  },
  exerciseListBox: {
    backgroundColor: '#0f0f10',
    padding: 14,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  exerciseListTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#3a3a3d',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  exerciseDeleteButton: {
    backgroundColor: '#3f3f42',
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  exerciseDeleteText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  matchTotalBox: {
    backgroundColor: '#0f0f10',
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  matchTotalTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  matchTotalText: {
    color: '#ffffff',
    fontSize: 17,
    marginBottom: 4,
  },
  emptyHistory: {
    color: '#b8b8bb',
    fontSize: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});