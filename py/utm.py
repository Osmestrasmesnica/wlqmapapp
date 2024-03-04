import pandas as pd
from tabulate import tabulate
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

path = "py/baza.xlsx"

# Read the Excel file into a DataFrame
df = pd.read_excel(path, sheet_name='Protokol + Lit + Herb')

# Exclude rows with specified values
exclude_values = {
    'UTM_10x10': 'Neprecizan podatak',
    'UTM_50x50': '#VALUE!',
    'UTM_100x100': 'Ne'
}
for col, value in exclude_values.items():
    df = df[df[col] != value]

# Specify the columns you want to keep
selected_columns = ["PunNazivTaksona", "UTM_10x10", "UTM_50x50", "UTM_100x100"]

# Create a new DataFrame with only the selected columns
new_df = df[selected_columns]

# 1) For each unique UTM_10x10, count the number of different PunNazivTaksona
count_utm_10x10 = new_df.groupby('UTM_10x10')['PunNazivTaksona'].nunique().sort_values(ascending=False)

# 2) For each unique UTM_50x50, count the number of different PunNazivTaksona
count_utm_50x50 = new_df.groupby('UTM_50x50')['PunNazivTaksona'].nunique().sort_values(ascending=False)

# 3) For each unique UTM_100x100, count the number of different PunNazivTaksona
count_utm_100x100 = new_df.groupby('UTM_100x100')['PunNazivTaksona'].nunique().sort_values(ascending=False)

# 4) For each unique PunNazivTaksona, count the number of values in UTM_10x10
count_pun_in_utm_10x10 = new_df.groupby('PunNazivTaksona')['UTM_10x10'].nunique().sort_values(ascending=False)

# 5) For each unique PunNazivTaksona, count the number of values in UTM_50x50
count_pun_in_utm_50x50 = new_df.groupby('PunNazivTaksona')['UTM_50x50'].nunique().sort_values(ascending=False)

# 6) For each unique PunNazivTaksona, count the number of values in UTM_100x100
count_pun_in_utm_100x100 = new_df.groupby('PunNazivTaksona')['UTM_100x100'].nunique().sort_values(ascending=False)

#! Save each count to a separate Excel sheet
with pd.ExcelWriter('py/count_results.xlsx', engine='xlsxwriter') as writer:
    count_utm_10x10.to_excel(writer, sheet_name='count_utm_10x10')
    count_utm_50x50.to_excel(writer, sheet_name='count_utm_50x50')
    count_utm_100x100.to_excel(writer, sheet_name='count_utm_100x100')
    count_pun_in_utm_10x10.to_excel(writer, sheet_name='count_pun_in_utm_10x10')
    count_pun_in_utm_50x50.to_excel(writer, sheet_name='count_pun_in_utm_50x50')
    count_pun_in_utm_100x100.to_excel(writer, sheet_name='count_pun_in_utm_100x100')

# Pronalaženje u bazi ukupnog broja taksona orhideja, utm100x100, utm50x50 i utm10x10
unique_taxa = new_df["PunNazivTaksona"].nunique()
unique_100x100 = new_df["UTM_100x100"].nunique()
unique_50x50 = new_df["UTM_50x50"].nunique()
unique_10x10 = new_df["UTM_10x10"].nunique()

# Display result
print("-"*30)
print("Unique taxa: " + str(unique_taxa))
print("Unique UTM_100x100: " + str(unique_100x100))
print("Unique UTM_50x50: " + str(unique_50x50))
print("Unique UTM_10x10: " + str(unique_10x10))
print("-"*30)

# Display the results using tabulate
print("1) Count of PunNazivTaksona for each unique UTM_10x10:")
print(len(count_utm_10x10))
print(tabulate(count_utm_10x10.reset_index(), headers='keys', tablefmt='pretty'))

print("\n2) Count of PunNazivTaksona for each unique UTM_50x50:")
print(len(count_utm_50x50))
print(tabulate(count_utm_50x50.reset_index(), headers='keys', tablefmt='pretty'))

print("\n3) Count of PunNazivTaksona for each unique UTM_100x100:")
print(len(count_utm_100x100))
print(tabulate(count_utm_100x100.reset_index(), headers='keys', tablefmt='pretty'))

print("\n4) Count of UTM_10x10 for each unique PunNazivTaksona:")
print(len(count_pun_in_utm_10x10))
print(tabulate(count_pun_in_utm_10x10.reset_index(), headers='keys', tablefmt='pretty'))

print("\n5) Count of UTM_50x50 for each unique PunNazivTaksona:")
print(len(count_pun_in_utm_50x50))
print(tabulate(count_pun_in_utm_50x50.reset_index(), headers='keys', tablefmt='pretty'))

print("\n6) Count of UTM_100x100 for each unique PunNazivTaksona:")
print(len(count_pun_in_utm_100x100))
print(tabulate(count_pun_in_utm_100x100.reset_index(), headers='keys', tablefmt='pretty'))

#TODO Za svaki 50x50UTM u zavisnosti koliko ima podataka PunNazivTaksona u njemu, hocu da napravim skalu sa razlicitim bojama za svaki broj PunNazivTaksona u 50x50UTM

# #! Normalize the counts to create a color scale
# normalized_counts = (count_pun_in_utm_50x50 - count_pun_in_utm_50x50.min()) / (count_pun_in_utm_50x50.max() - count_pun_in_utm_50x50.min())
# colors = sns.color_palette("Paired", n_colors=len(count_utm_50x50))  # Specify the desired number of colors

# #! Plot the color-coded count
# #* dobro je i ovo samo nema brojeve u plotovima
# plt.figure(figsize=(10, 6))
# sns.barplot(x=count_utm_50x50.index, y=count_utm_50x50.values, hue=count_utm_50x50.index, palette=colors, dodge=False)  # Set dodge to False
# plt.title('Count of PunNazivTaksona for each unique UTM_50x50')
# plt.xlabel('UTM_50x50')
# plt.ylabel('Count of PunNazivTaksona')
# plt.legend().set_visible(False)  # Hide the legend to match the legend=False effect
# plt.show()

# Normalize the counts to create a color scale for UTM_50x50
normalized_counts_50x50 = (count_pun_in_utm_50x50 - count_pun_in_utm_50x50.min()) / (count_pun_in_utm_50x50.max() - count_pun_in_utm_50x50.min())
colors_50x50 = sns.color_palette("Paired", n_colors=len(count_utm_50x50))  # Specify the desired number of colors

# Normalize the counts to create a color scale for UTM_100x100
normalized_counts_100x100 = (count_pun_in_utm_100x100 - count_pun_in_utm_100x100.min()) / (count_pun_in_utm_100x100.max() - count_pun_in_utm_100x100.min())
colors_100x100 = sns.color_palette("Paired", n_colors=len(count_utm_100x100))  # Specify the desired number of colors

# Normalize the counts to create a color scale for UTM_10x10
normalized_counts_10x10 = (count_pun_in_utm_10x10 - count_pun_in_utm_10x10.min()) / (count_pun_in_utm_10x10.max() - count_pun_in_utm_10x10.min())
colors_10x10 = sns.color_palette("Paired", n_colors=len(count_utm_10x10))  # Specify the desired number of colors

# Plot the color-coded count with legend and value numbers for UTM_50x50
plt.figure(figsize=(10, 6))
ax = sns.barplot(x=count_utm_50x50.index, y=count_utm_50x50.values, palette=colors_50x50, dodge=False)

# Add legend
ax.legend(title='Legend', loc='upper right', bbox_to_anchor=(1, 1))

# Add value numbers on the bars
for p, label in zip(ax.patches, count_utm_50x50.values):
    ax.annotate(label, (p.get_x() + p.get_width() / 2., p.get_height()), ha='center', va='center', xytext=(0, 10), textcoords='offset points')

plt.title('Count of PunNazivTaksona for each unique UTM_50x50')
plt.xlabel('UTM_50x50')
plt.ylabel('Count of PunNazivTaksona')
plt.show()

# Plot the color-coded count with legend and value numbers for UTM_100x100
plt.figure(figsize=(10, 6))
ax = sns.barplot(x=count_utm_100x100.index, y=count_utm_100x100.values, palette=colors_100x100, dodge=False)

# Add legend
ax.legend(title='Legend', loc='upper right', bbox_to_anchor=(1, 1))

# Add value numbers on the bars
for p, label in zip(ax.patches, count_utm_100x100.values):
    ax.annotate(label, (p.get_x() + p.get_width() / 2., p.get_height()), ha='center', va='center', xytext=(0, 10), textcoords='offset points')

plt.title('Count of PunNazivTaksona for each unique UTM_100x100')
plt.xlabel('UTM_100x100')
plt.ylabel('Count of PunNazivTaksona')
plt.show()

# Plot the color-coded count with legend and value numbers for UTM_10x10
plt.figure(figsize=(12, 8))
ax = sns.barplot(x=count_utm_10x10.index, y=count_utm_10x10.values, palette=colors_10x10, dodge=False)

# Rotate x-axis labels for better readability
ax.set_xticklabels(ax.get_xticklabels(), rotation=90, horizontalalignment='right', fontsize=5)  # Adjust font size for x-axis labels

# Add legend with smaller font size
ax.legend(title='Legend', loc='upper right', bbox_to_anchor=(1, 1), fontsize='small')

# Add value numbers on the bars with smaller font size
for p, label in zip(ax.patches, count_utm_10x10.values):
    ax.annotate(label, (p.get_x() + p.get_width() / 2., p.get_height()), ha='center', va='center', xytext=(0, 5), textcoords='offset points', fontsize=5)  # Adjust font size

# Set title and axis labels with smaller font size
plt.title('Count of PunNazivTaksona for each unique UTM_10x10')
plt.xlabel('UTM_10x10')
plt.ylabel('Count of PunNazivTaksona')

plt.tight_layout()  # Adjust layout to prevent clipping of labels
plt.show()

#TODO Za svaki 50x50 i 10x10:
#/todo 1) napraviti skalu u odnosu na vrednost u svakom kvadratu
#/todo 2) za svaki broj u skali dodeliti boju (napraviti neki spekatar kao sto je gore "Pair")
#todo 3) povezati sa HTML
#todo 4) pritiskom na dugme omogućiti 5) 6)
#todo 5) kružić na mapi sa prečnikom u zavisnosti od raspona (min, max podeljea sa broj koji smo dobili za skalu u 2) koraku)
#todo 6) poslati kružić na odgovarajuće mesto na slici
#todo vidi da li možeš ovo da spojiš direktno sa HTML, ili mora preko JS, ili može Turtle da se koristi
#todo Extra: vidi kako možeš odmah da kreiraš i legendu u gornjem levom delu 

# Pravljenje Dictionary sa UTM 50x50, Taksonima, Bojama i Pozicijom
# Assuming you have already loaded and processed the data

# Initialize an empty dictionary to store the color scale information
color_scale_data = {}

# Iterate through each unique value of UTM_50x50
for utm_50x50_value in count_utm_50x50.index:
    # Filter the DataFrame to get data corresponding to the current UTM_50x50 value
    filtered_data = new_df[new_df['UTM_50x50'] == utm_50x50_value]
    
    # Get the unique PunNazivTaksona values and their counts for the current UTM_50x50 value
    pun_values = filtered_data['PunNazivTaksona'].unique()
    pun_counts = filtered_data.groupby('PunNazivTaksona').size()
    
    # Normalize the counts to create a color scale
    normalized_counts = (pun_counts - pun_counts.min()) / (pun_counts.max() - pun_counts.min())
    
    # Define colors for the color scale (you can use any color mapping)
    colors = sns.color_palette("Paired", n_colors=len(pun_values))
    
    # Initialize an empty list to store color scale information for the current UTM_50x50 value
    color_scale_data[utm_50x50_value] = []
    
    # Iterate through each PunNazivTaksona value and its corresponding color and normalized count
    for pun_value, color, normalized_count in zip(pun_values, colors, normalized_counts):
        # Define the color scale information for the current PunNazivTaksona value
        color_info = {
            'UTM50x50': utm_50x50_value,
            'BrojTaksona': pun_counts[pun_value],  # Broj taksona za trenutnu vrednost
            'Boja': color,  # Kod za boju
            'Pozicija': None  # Možete dodati logiku za određivanje pozicije
        }
        
        # Append the color scale information to the list for the current UTM_50x50 value
        color_scale_data[utm_50x50_value].append(color_info)

# # Print the color scale data
# for utm_50x50_value, scale_info in color_scale_data.items():
#     print(f"UTM_50x50: {utm_50x50_value}")
#     for info in scale_info:
#         print(info)

print(color_scale_data)

