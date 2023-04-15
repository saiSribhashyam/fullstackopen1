import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import TextInput from "./TextInput";
import { useDebounce } from "use-debounce";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    margin: 5,
    backgroundColor: "white",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    margin: 5,
    backgroundColor: "white",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const FilterText = ({ setFilterText }) => {
  return (
    <TextInput
      onChangeText={(text) => setFilterText(text)}
      placeholder='Filter repositories...'
      style={{ margin: 5, backgroundColor: "white" }}
    />
  );
};

const Dropdown = ({ setSortBy }) => {
  return (
    <RNPickerSelect
      style={{ ...pickerSelectStyles }}
      placeholder={{
        label: "Sort repositories...",
        value: "",
      }}
      onValueChange={(value) => setSortBy(value)}
      items={[
        { label: "Latest repositories", value: "CREATED_AT" },
        { label: "Highest rated repositories", value: "DESC" },
        { label: "Lowest rated repositories", value: "ASC" },
      ]}
      // style={
      //   Platform.OS === "ios"
      //     ? pickerSelectStyles.inputIOS
      //     : pickerSelectStyles.inputAndroid
      // }
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <View>
        <Dropdown setSortBy={props.setSortBy} />
        <FilterText setFilterText={props.setFilterText} />
      </View>
    );
  };

  render() {
    const onEndReach = this.props.onEndReach;
    const repositories = this.props.repositories;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        testID='repositoryItem'
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterTextValue] = useDebounce(filterText, 500);

  const { repositories, fetchMore } = useRepositories(sortBy, filterTextValue);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSortBy={setSortBy}
      setFilterText={setFilterText}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;

// export const RepositoryListContainer = ({
//   repositories,
//   setSortBy,
//   setFilterText,
// }) => {
//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];

//   return (
//     <FlatList
//       ListHeaderComponent={() => (
//         <View>
//           <Dropdown setSortBy={setSortBy} />
//           <FilterText setFilterText={setFilterText} />
//         </View>
//       )}
//       testID='repositoryItem'
//       data={repositoryNodes}
//       keyExtractor={({ id }) => id}
//       renderItem={({ item }) => <RepositoryItem repository={item} />}
//       ItemSeparatorComponent={ItemSeparator}
//     />
//   );
// };
