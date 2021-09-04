# subject priority difficulty hours
# difficulty is integer with hard equal to 3 and easy at 1
# priority is also integer
subjects = [ ["DBMS", 1, 3, 3],
    ["Software", 3, 3, 2],
    ["OS", 2, 1, 3],
    ["CO", 4, 3, 2], ]


def calc_hours(subjects, free_hours):
    required_hours = sum( [sub[3] for sub in subjects] )
    print("extra time left: ", (free_hours - required_hours))
    if required_hours > free_hours:
        option = input("Your free time is less than the required hours.\n" +
                "Do you want to calculate by ignoring some topics (enter 1) or \n" +
                "Do you want to calculate in terms of ratio (enter anything else): ")
        if option != '1':
            for i in range(len(subjects)):
                subjects[i][3] *= free_hours / required_hours
            subjects.sort(key = lambda x: x[1])
        else:
            subjects.sort(key = lambda x: x[1])
            s = 0
            for i in range(len(subjects)):
                s += subjects[i][3]
                if s > free_hours:
                    subjects[i][3] -= (s - free_hours)
                    subjects = subjects[:i+1]
                    break
                elif s == free_hours:
                    subjects = subjects[:i+1]
                    break
    else:
        subjects.sort(key = lambda x: x[1])
    return subjects

def scheduler(subjects):
    diffs = [0,0,0]
    for sub in subjects:
        diffs[sub[2] - 1] += 1
    check = diffs[2] <= (diffs[1] + diffs[0] + 1)
    if not check:
        num_breaks = diffs[2] - (diffs[1] + diffs[0] + 1)
        print("You need", num_breaks, "breaks")
    diffs_order = {
        1: [], 2: [], 3: []
    }
    for subject in subjects:
        diffs_order[ subject[2] ].append(subject)
    return diffs_order

free_hours = int(input("Free hours: "))
subjects = calc_hours(subjects, free_hours)
subs = scheduler(subjects)

now = 1

# Removes all difficulty 3 topics
while len(subs[3]) > 0:
    print(subs[3][0])
    subs[3].pop(0)
    if len(subs[now]) > 0:
        print(subs[now][0])
        subs[now].pop(0)
        now = 3 - now
    else:
        now = 3 - now
        if len(subs[now]) > 0:
            print(subs[now][0])
            subs[now].pop(0)
        else:
            if len(subs[3]) > 0:
                print("Take 15 mins break")

# Removes all difficulty 2 topics
while len(subs[2]) > 0:
    print(subs[2][0])
    subs[2].pop(0)
    if len(subs[1]) > 0:
        print(subs[1][0])
        subs[1].pop(0)
    else:
        if len(subs[2]) > 0:
            print("Take 10 mins break")

# Removes all difficulty 1 topics
while len(subs[1]) > 0:
    print(subs[1][0])
    subs[1].pop(0)
    if len(subs[1]) > 0:
        print("Take 10 mins break")

print("Schedule done")